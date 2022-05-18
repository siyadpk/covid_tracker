import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router) { }

  /**
   * @description if the login credentials are correct,
   * sets the permission for user and navigate the user to dashboard
   * 
   * @param username provided username in login form 
   * @param password provided password in login form 
   * @returns boolean based on user passed authentication or not
   */
  login({ username, password }: User): boolean {
    if (username == environment.username && password == environment.password) {
      this.setPermission(username);
      this._router.navigateByUrl('/');
      return true
    } else {
      return false
    }
  }

  /**
   * @description remove the user permission and navigate to login page
   */
  logout(): void {
    this.removePermission();
    this._router.navigateByUrl('/login')
  }

  /**
   * @description add permission flag to localStorage, also adds username
   * to localStorage
   */
  setPermission(username: string): void {
    localStorage.setItem('is_permitted', '1');
    localStorage.setItem('username', username)
  }

  /**
   * @description this method clears the local storage inorder to clear
   * all logged in user data
   */
  removePermission(): void {
    localStorage.clear();
  }

  /**
   * @returns if the user is logged in
   */
  get isLoggedIn(): string | null {
    return localStorage.getItem('is_permitted')
  }

  /**
   * @returns user name of the logged in user
   */
  get getUserName(): string | null {
    return localStorage.getItem('username')
  }

}
