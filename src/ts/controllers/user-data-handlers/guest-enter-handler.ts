class GuestEnterHandler {
  perfectEarGuestUser: string | null;

  constructor() {
    this.perfectEarGuestUser = this.getGuestUserEnterFromSessionStorage();
  }

  private getGuestUserEnterFromSessionStorage(): string | null {
    const guestUserEnterJSON = sessionStorage.getItem('perfectEarGuestUser');
    return guestUserEnterJSON;
  }

  public saveGuestUserEnterToSessionStorage(): void {
    sessionStorage.setItem('perfectEarGuestUser', 'true');
  }
}

export default GuestEnterHandler;
