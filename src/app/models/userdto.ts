export class UserBase
{

    id:string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userName: string;
    created: Date;
    modified: Date;

}

 export class UserDto extends UserBase
{


}

export class UserUpdateDto extends UserBase
{


}

export class UserDeleteDto
{
    id: string;

}

export class UserBasicDto
{



}
export class UserCreateDto
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userName: string;
   

}export class UserLoginDto
{
    email: string;
    password: string;


}
