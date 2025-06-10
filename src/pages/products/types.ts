interface User {
  firstname: string;
  lastname: string;
  email: string;
}

interface Color {
  name: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  description: string;
  count: number;
  skidka: number;
  categoryId: string;
  userId: string;
  createdAt: string;
  user: User;
  colors: Color[];
  category: Color;
  likes: any[];
  comments: any[];
  totalLikes: number;
  discountedPrice: number;
  avgStars: string;
}
