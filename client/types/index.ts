export type ExtraOptions = {
    _id: number;
    text: string;
    price: number;
  };

export type Pizza={
    _id: number;
    img: string;
    title: string;
    prices: Array<number>;
    desc: string;
    extraOptions: Array<ExtraOptions>;
  };

export type Order = {
    _id:number,
    customer:string
    address:string,
    total: number,
    status:number,
    method:number
  }
