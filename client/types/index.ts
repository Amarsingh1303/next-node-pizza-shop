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