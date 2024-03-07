export class CreateCartDto {
  drugs: { [key: number]: number };
  name: string;
  email: string;
  phone: string;
  address: string;
}
