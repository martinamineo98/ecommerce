import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {

  nav: any[] = [
    {
      str: 'account information',
      content: 'a'
    },
    {
      str: 'adress book',
      content: 'b'
    },
    {
      str: 'orders',
      content: 'c'
    },
    {
      str: 'settings',
      content: 'd'
    }
  ]
  
  content: any = this.nav[0].content

  changeContent(content: any) {
    this.content = content
  }

}
