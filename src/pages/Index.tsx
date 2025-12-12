import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Чизбургер Классик',
    description: 'Сочная котлета, расплавленный сыр, свежие овощи',
    price: 189,
    image: 'https://cdn.poehali.dev/projects/905f7525-712d-4fb5-aae8-1eb1976904b0/files/7bf32923-d158-40e8-96bc-f07bb77b5c4e.jpg',
    category: 'Бургеры'
  },
  {
    id: 2,
    name: 'Биг Бургер',
    description: 'Двойная котлета, специальный соус, хрустящий салат',
    price: 259,
    image: 'https://cdn.poehali.dev/projects/905f7525-712d-4fb5-aae8-1eb1976904b0/files/7bf32923-d158-40e8-96bc-f07bb77b5c4e.jpg',
    category: 'Бургеры'
  },
  {
    id: 3,
    name: 'Картофель Фри',
    description: 'Хрустящий золотистый картофель с морской солью',
    price: 99,
    image: 'https://cdn.poehali.dev/projects/905f7525-712d-4fb5-aae8-1eb1976904b0/files/857b97f1-a068-4d74-aefa-e9349186c58a.jpg',
    category: 'Закуски'
  },
  {
    id: 4,
    name: 'Картофель Деревенский',
    description: 'Картофельные дольки с пряными специями',
    price: 119,
    image: 'https://cdn.poehali.dev/projects/905f7525-712d-4fb5-aae8-1eb1976904b0/files/857b97f1-a068-4d74-aefa-e9349186c58a.jpg',
    category: 'Закуски'
  },
  {
    id: 5,
    name: 'Шоколадный Милкшейк',
    description: 'Густой коктейль с натуральным шоколадом',
    price: 149,
    image: 'https://cdn.poehali.dev/projects/905f7525-712d-4fb5-aae8-1eb1976904b0/files/041fcf32-7d53-42cc-9cf3-66b4c545d2aa.jpg',
    category: 'Напитки'
  },
  {
    id: 6,
    name: 'Ванильный Милкшейк',
    description: 'Сливочный коктейль с мадагаскарской ванилью',
    price: 149,
    image: 'https://cdn.poehali.dev/projects/905f7525-712d-4fb5-aae8-1eb1976904b0/files/041fcf32-7d53-42cc-9cf3-66b4c545d2aa.jpg',
    category: 'Напитки'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(cartItem =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
      return prevCart.filter(cartItem => cartItem.id !== id);
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between bg-green-600">
          <div className="flex items-center gap-2">
            <img 
              src="https://cdn.poehali.dev/files/вкусно-и-точка.jpg" 
              alt="Вкусно и точка" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold text-[#ffffff]">Вкусно и точка</span>
          </div>
          
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => setActiveSection('home')}
              className={`font-semibold text-lg px-6 py-2 rounded-full transition-all ${
                activeSection === 'home' ? 'bg-black text-white' : 'text-foreground hover:bg-black hover:text-white'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveSection('menu')}
              className={`font-semibold text-lg transition-colors ${
                activeSection === 'menu' ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Меню
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`font-semibold text-lg transition-colors ${
                activeSection === 'about' ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              О нас
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative rounded-full h-12 w-12 border-2 hover:border-primary transition-colors">
                <Icon name="ShoppingCart" size={22} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold bg-accent border-2 border-white">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Minus" size={16} />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => addToCart(item)}
                          >
                            <Icon name="Plus" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Итого:</span>
                        <span>{totalPrice} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {activeSection === 'home' && (
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight">
                Закажи <span className="text-[#000000]">вкусно</span>
                <br className="hidden md:block" />
                <span className="text-[#000000]">прямо сейчас</span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium">
                Быстрая доставка любимых блюд. Свежие продукты, честные цены, безопасная оплата
              </p>
              <Button
                size="lg"
                className="text-lg md:text-xl px-10 py-7 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                onClick={() => setActiveSection('menu')}
              >
                Смотреть меню
                <Icon name="ArrowRight" size={24} className="ml-2" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-6xl mx-auto">
              {menuItems.slice(0, 3).map(item => (
                <Card key={item.id} className="overflow-hidden group cursor-pointer animate-fade-in border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4 bg-white">
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl">{item.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">{item.price} ₽</span>
                      <Button
                        size="lg"
                        className="rounded-full font-bold px-6"
                        onClick={() => addToCart(item)}
                      >
                        <Icon name="Plus" size={18} className="mr-1" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'menu' && (
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16">Наше меню</h2>
            
            {categories.map(category => (
              <div key={category} className="mb-16">
                <h3 className="text-3xl font-bold mb-8 text-primary">{category}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems
                    .filter(item => item.category === category)
                    .map(item => (
                      <Card key={item.id} className="overflow-hidden group cursor-pointer animate-fade-in border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-3xl">
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 space-y-4 bg-white">
                          <div className="space-y-2">
                            <h3 className="font-bold text-xl">{item.name}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-foreground">{item.price} ₽</span>
                            <Button
                              size="lg"
                              className="rounded-full font-bold px-6"
                              onClick={() => addToCart(item)}
                            >
                              <Icon name="Plus" size={18} className="mr-1" />
                              В корзину
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl font-bold text-center">О нас</h2>
              
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  <span className="font-bold text-foreground">Вкусно и точка</span> — это сеть ресторанов быстрого питания, 
                  которая предлагает качественные блюда по доступным ценам.
                </p>
                
                <p>
                  Мы используем только свежие продукты от проверенных поставщиков и готовим блюда 
                  по авторским рецептам. Наша цель — сделать вкусную еду доступной для каждого.
                </p>

                <div className="grid md:grid-cols-3 gap-6 pt-8">
                  <Card className="p-6 text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="Clock" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground">Быстрая доставка</h4>
                    <p className="text-sm text-muted-foreground">Доставим заказ за 30-40 минут</p>
                  </Card>

                  <Card className="p-6 text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="ShieldCheck" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground">Безопасная оплата</h4>
                    <p className="text-sm text-muted-foreground">Защищенные платежи онлайн</p>
                  </Card>

                  <Card className="p-6 text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="Heart" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground">Свежие продукты</h4>
                    <p className="text-sm text-muted-foreground">Только качественные ингредиенты</p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-secondary py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Вкусно и точка. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;