import {TokenService, UserService, authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {Filter, model, property, repository} from '@loopback/repository';
import {HttpErrors, del, get, param, patch, post, requestBody} from '@loopback/rest';
import {SecurityBindings, UserProfile, securityId} from '@loopback/security';
import {User} from '../models';
import {Credentials, UpdateUserDetails, UserRepository} from '../repositories';
import {PasswordHasher, validateCredentials} from '../services';
import {CredentialsRequestBody, CredentialsRequestBodyAdmin, CredentialsRequestBodyLogin, UpdateUserDetailsRequest, UserProfileSchema} from './specs/user-controller.specs';

import _ from 'lodash';
import {PasswordHasherBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {basicAuthorization} from '../middlewares/auth.midd';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class UserController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
  ) {
  }

  @post('/users/sign-up', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody(CredentialsRequestBody)
    newUserRequest: Credentials,
  ): Promise<User> {
    // ensure valid email, password, and phone value
    validateCredentials(_.pick(newUserRequest, ['email', 'password', 'phone', 'role']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(newUserRequest.password);

    try {
      // create the new user
      const savedUser = await this.userRepository.create(_.omit(newUserRequest, 'password'));

      // set the password
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @post('/users/sign-up/admin', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async createAdmin(
    @requestBody(CredentialsRequestBodyAdmin)
    newUserRequest: Credentials,
  ): Promise<User> {
    // All new users have the "admin" role by default
    newUserRequest.role = 'admin';

    // ensure a valid email, phone, and password
    validateCredentials(_.pick(newUserRequest, ['email', 'password', 'phone', 'role']));

    const password = await this.passwordHasher.hashPassword(newUserRequest.password);

    try {
      const savedUser = await this.userRepository.create(_.omit(newUserRequest, 'password'));
      await this.userRepository.userCredentials(savedUser.id).create({password});
      return savedUser;
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }



  @get('/users/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': User,
              },
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async get(
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @get('/users/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {

    const userId = currentUserProfile[securityId];
    return this.userRepository.findById(userId);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBodyLogin) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {token};
  }

  @patch('/users/{userId}', {
    responses: {
      '200': {
        description: 'User details updated successfully',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,  // Returning updated user details
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async updateUserDetails(
    @param.path.string('userId') userId: string,
    @requestBody(UpdateUserDetailsRequest)
    updateUserDetailsRequest: UpdateUserDetails,  // Request type
  ): Promise<User> {  // Return the updated user
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new HttpErrors.NotFound(`User with id ${userId} not found.`);
    }

    try {
      // Update the user details
      await this.userRepository.updateById(userId, {
        name: updateUserDetailsRequest.name,
        email: updateUserDetailsRequest.email,
        phone: updateUserDetailsRequest.phone,
        role: updateUserDetailsRequest.role,
      });

      // Return the updated user details
      return this.userRepository.findById(userId);
    } catch (error) {
      throw new HttpErrors.BadRequest(`Failed to update user details.`);
    }
  }

  @post('/users/{userId}/change-password', {
    responses: {
      '200': {
        description: 'Password changed successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async changePassword(
    @param.path.string('userId') userId: string,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['newPassword'],
            properties: {
              newPassword: {
                type: 'string',
              },
            },
          },
        },
      },
    }) newPasswordData: {newPassword: string}
  ): Promise<{message: string}> {
    const password = await this.passwordHasher.hashPassword(newPasswordData.newPassword);

    // Update the password in user credentials
    const userCredentials = await this.userRepository.findCredentials(userId);
    if (!userCredentials) {
      throw new HttpErrors.NotFound('User credentials not found');
    }

    await this.userRepository.userCredentials(userId).patch({password});
    return {message: 'Password changed successfully'};
  }

  @del('/users/{userId}', {
    responses: {
      '204': {
        description: 'User deleted successfully',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async deleteUser(
    @param.path.string('userId') userId: string,
  ): Promise<void> {
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new HttpErrors.NotFound(`User with id ${userId} not found.`);
    }

    try {
      // Delete the user by ID
      await this.userRepository.deleteById(userId);
    } catch (error) {
      throw new HttpErrors.BadRequest(`Failed to delete user.`);
    }
  }

}
