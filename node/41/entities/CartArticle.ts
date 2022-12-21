import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { Cart } from "./Cart";

@Index("uq_cart_article_cart_id_article_id", ["cartId", "articleId"], {
  unique: true,
})
@Index("fk_cart_article_article_id", ["articleId"], {})
@Entity("cart_article", { schema: "aplikacija" })
export class CartArticle {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "cart_article_id",
    unsigned: true,
  })
  cartArticleId: number;

  @Column("int", { name: "cart_id", unsigned: true, default: () => "'0'" })
  cartId: number;

  @Column("int", { name: "article_id", unsigned: true, default: () => "'0'" })
  articleId: number;

  @Column("int", { name: "quantity", unsigned: true, default: () => "'0'" })
  quantity: number;

  @ManyToOne(() => Article, (article) => article.cartArticles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }])
  article: Article;

  @ManyToOne(() => Cart, (cart) => cart.cartArticles, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
  cart: Cart;
}
