import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { CartArticle } from "./cart-article.entity";
import { Order } from "./Order";

@Index("fk_cart_user_id", ["userId"], {})
@Entity("cart")
export class Cart {
  @PrimaryGeneratedColumn({ type: "int", name: "cart_id", unsigned: true })
  cartId: number;

  @Column({ type: "int", name: "user_id", unsigned: true })
  userId: number;

  @Column({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(
    () => CartArticle,
    CartArticle => CartArticle.cart
  )
  CartArticles: CartArticle[];

  @ManyToOne(
    () => User, 
    user => user.carts,
     { onDelete: "NO ACTION", onUpdate: "CASCADE" }
     )
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;

  @OneToOne(
  () => Order, 
  order => order.cart
  )
  order: Order;
}
