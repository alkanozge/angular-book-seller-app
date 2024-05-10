export class Book{
  id: number |undefined;
  title: string="";
  author: string="";
  price: number=0.0;
  description: string="";
  createTime: Date=new Date();

  constructor(id?: number, title: string="", price: number=0) { //? means that it can be undefined
    this.id=id;
    this.title=title;
    this.price=price;
  }
}
