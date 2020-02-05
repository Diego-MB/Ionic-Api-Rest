import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private api_url = 'https://reqres.in/api/';

  constructor(private http: HttpClient) { }

  // createAccount(email: string, password: string) {
  //   return new Promise((resolve, reject) => {
      
  //     let data = {
  //       email: email,
  //       password: password
  //     };

  //     this.http.post(this.api_url + 'register', data)
  //     .subscribe((result: any) => {
  //       resolve(result)
  //     },
  //     (error) => {
  //       reject(error)
  //     })

  //   });
  // }

  createAccount(email: string, password: string) {
    return new Promise((resolve, reject) => {
      
      let data = {
        email: email,
        password: password
      };

      this.http.post(this.api_url + 'register', data)
      .subscribe((result: any) => {
        resolve(result)
      },
      (error) => {
        reject(error.error)
      })

    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      
      let data = {
        email: email,
        password: password
      };

      this.http.post(this.api_url + 'login', data)
      .subscribe((result: any) => {
        resolve(result)
      },
      (error) => {
        reject(error.error)
      })

    });
  }

  getAll(page: number) {
    return new Promise((resolve, reject) => {

      let url = this.api_url + 'users?per_page=10&page=' + page;

      this.http.get(url)
      .subscribe((result: any) => {
        resolve(result)
      },
      (error) => {
        reject(error.error)
      })

    });
  }

  get(id: number) {
    return new Promise((resolve, reject) => {

      let url = this.api_url + 'users/' + id;

      this.http.get(url)
      .subscribe((result: any) => {
        resolve(result)
      },
      (error) => {
        reject(error.error)
      })

    });
  }

  insert(user: any) {
    return new Promise((resolve, reject) => {

      let url = this.api_url + 'users';

      this.http.post(url, user)
      .subscribe((result: any) => {
        resolve(result)
      },
      (error) => {
        reject(error.error)
      })

    });
  }

  update(user: any) {
    return new Promise((resolve, reject) => {

      let url = this.api_url + 'users/' + user.id;
      let data = {
        "first_name": user.first_name,
        "last_name": user.last_name
      }

      this.http.put(url, data)
      .subscribe((result: any) => {
        resolve(result)
      },
      (error) => {
        reject(error.error)
      })

    });
  }

  remove(id: number) {
    return new Promise((resolve, reject) => {

      let url = this.api_url + 'users/' + id;     

      this.http.delete(url)
      .subscribe((result: any) => {
        resolve(result)
      },
      (error) => {
        reject(error.error)
      })

    });
  }

}
