import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {

  currentBlock: string = ''

  user = {
    first_name: 'john',
    last_name: 'doe',
    email: 'johndoe@gmail.com',
    birthdate: '01/01/2001'
  }

  userElements: any[] = []

  navItems: any[] = []
  userBlocks: any[] = []

  nav: any[] = [
    {
      str: 'account information'
    },
    {
      str: 'adress book'
    },
    {
      str: 'orders'
    },
    {
      str: 'settings'
    }
  ]

  ngOnInit() {
    this.currentBlock = this.nav[0].str
    this.populateUserElements()
  }

  ngAfterViewInit() {
    this.navItems = Array.from(document.querySelectorAll('.user-nav a'))
    this.userBlocks = Array.from(document.querySelectorAll('.user-block'))

    this.navItems[0].classList.add('current')
    this.userBlocks[0].classList.add('show')
  }

  changeContent(i: number) {
    this.navItems.map((item) => item.classList.remove('current'))
    this.navItems[i].classList.add('current')

    this.userBlocks.map((item) => item.classList.remove('show'))
    this.userBlocks[i].classList.add('show')

    this.currentBlock = this.nav[i].str
  }

  getUserInfo() {

  }

  populateUserElements() {
    for (let [k, v] of Object.entries(this.user)) {
      this.userElements.push([k.replace('_', ' '), v])
    }
  }

  clickEditBtn() {
    this.changeContent(3)
  }

}
