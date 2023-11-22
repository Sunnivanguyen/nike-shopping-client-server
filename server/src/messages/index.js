export const MSG_COMMON = {
  MSG_ERROR: {
    BadRequestException: 'Bad request',
    UnauthorizedException: 'Unauthorized',
    NotFoundException: 'Not Found',
    ForbiddenException: 'Forbidden',
    InternalServerException: 'Internal Server Error',
  },
  MSG_SUCCESS: (data) => ({
    create: `Create ${data} successfully`,
    read: `Get ${data} successfully`,
    update: `Update ${data} successfully`,
    delete: `Delete ${data} successfully`,
  }),
  MSG_FAILURE: (data) => ({
    create: `Create ${data} fail`,
    read: `Get ${data} fail`,
    update: `Update ${data} fail`,
    delete: `Delete ${data} fail`,
  }),
};

export const MSG_VALIDATION = {
  UnauthorizedException: 'Wrong Email or Password',
};
