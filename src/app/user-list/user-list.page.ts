import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController, IonInfiniteScroll } from '@ionic/angular';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  users: any[];
  page: number;
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  constructor(
    public router: Router,   
    private toast: ToastController,
    private usersService: UsersService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.users = [];
    this.page = 1;
    // this.infiniteScroll.disabled = false;
    this.getAllUsers(this.page);                   
  }

  getAllUsers(page: number) {        
    this.usersService.getAll(page)
    .then((result: any) => {
      
      for (let i = 0; i < result.data.length; i++) {
        const user = result.data[i];
        this.users.push(user);                               
      }      
      
      if(this.infiniteScroll) {
        this.infiniteScroll.complete();
        console.log("Array users: " + this.users.length + " total de registro: " + result.total);
        if(this.users.length == result.total) {
          this.infiniteScroll.disabled = true;          
          
        } 
      }
      
    })
    .catch((error: any) => {
      this.toast.create({ message: "Erro ao listar os usuários. Erro: " + error.error,
                          position: "bottom", duration: 3000})
                          .then(toast => { toast.present(); });
    });

  }

  getUser() {
    setTimeout(() => {
      this.page++;
      this.getAllUsers(this.page);
    }, 500);    
  }

  openUser(id: number) {
    this.usersService.get(id)
    .then((result: any) => {      
      this.router.navigate(["/user-detail/", { user: result.data }]);      
      
    })
    .catch((error: any) => {
      this.toast.create({ message: "Erro ao recuperar o usuário. Erro: " + error.error,
                          position: "bottom", duration: 3000})
                          .then(toast => { toast.present(); });
    });

  }

  openCreateUser() {
    this.router.navigate(["/user-edit"]);
  }

  openEditUser(id: number) {
    this.usersService.get(id)
    .then((result: any) => {            
      // this.router.navigate(["/user-edit", {user: result.data }]);
      this.router.navigate(["/user-edit", result.data.id ]);            
    })
    .catch((error: any) => {
      this.toast.create({ message: "Erro ao recuperar o usuário. Erro: " + error.error,
                          position: "bottom", duration: 3000})
                          .then(toast => { toast.present(); });
    });
  }

  deleteUser(user: any) {
    this.usersService.remove(user.id)
    .then((result: any) => {
      let index = this.users.indexOf(user);
      this.users.slice(index, 1);

      this.toast.create({ message: "Usuário excluído com sucesso.", position: "bottom",
                          duration: 3000}).then(toast => { toast.present(); });
    })
    .catch((error: any) => {
      this.toast.create({ message: "Erro ao excluir o usuário. Erro: " + error.error,
                          position: "bottom", duration: 3000}).then(toast => {
                            toast.present();
                          });
    });
  }

}
