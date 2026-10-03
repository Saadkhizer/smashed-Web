import { CartProvider } from "@/lib/cart";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import { Strip, Promo, Steps, Reviews, Find, Footer } from "@/components/Sections";
import { ItemModal, CartDrawer, CartBar, Toast } from "@/components/Order";
import Motion from "@/components/Motion";
import Backdrop from "@/components/Backdrop";

export default function Page() {
  return (
    <CartProvider>
      <Backdrop />
      <Nav />
      <main>
        <Hero />
        <Strip />
        <Menu />
        <Promo />
        <Steps />
        <Reviews />
        <Find />
      </main>
      <Footer />
      <ItemModal />
      <CartDrawer />
      <CartBar />
      <Toast />
      <Motion />
    </CartProvider>
  );
}
