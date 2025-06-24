export enum HttpCode{
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZIED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
    
}

export enum Message {
    SOMETHING_WENT_WRONG = "Something went wrong!",
    NO_DATA_FOUND = "No data found!",
    CREATE_FAILED = "Create is failed",
    TOKEN_CREATION_FAILED = "Token creation is failed",
    UPDATE_FAILED = "Update is failed",
    BLOCKED_USER = "You have been blocked, please contact restaurant",
    USED_NICK_PHONE = "You are inserting already registered nick or phone number!",
    NO_MEMBER_NICK = "No member with that member nick!",
    WRONG_PASSWORD = "Wrong passsword, please try again!",
    NOT_AUTHENTICATED = "You are not authenicated, please login first!"
  }
  
  class Errors extends Error {
    public code: HttpCode;
    public message: Message;

    static standart = {
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: Message.SOMETHING_WENT_WRONG
    }
  
    constructor(statusCode: HttpCode, statusMessage: Message) {
      super();
      this.code = statusCode;
      this.message = statusMessage;
    }
  }
  
  export default Errors; 
