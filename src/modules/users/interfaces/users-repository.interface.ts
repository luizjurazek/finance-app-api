export abstract class IUsersRepository {
  abstract create(data: any): Promise<any>;
  abstract findByEmail(email: string): Promise<any | null>;
  abstract findById(id: number): Promise<any | null>;
}
