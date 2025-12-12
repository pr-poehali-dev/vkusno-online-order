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
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://cdn.poehali.dev/files/вкусно-и-точка.jpg" 
              alt="Вкусно и точка" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-2xl font-bold text-primary">Вкусно и точка</span>
          </div>
          
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => setActiveSection('home')}
              className={`font-medium transition-colors ${
                activeSection === 'home' ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveSection('menu')}
              className={`font-medium transition-colors ${
                activeSection === 'menu' ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Меню
            </button>
            <button
              onClick={() => setActiveSection('about')}
              className={`font-medium transition-colors ${
                activeSection === 'about' ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              О нас
            </button>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
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
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Закажи <span className="text-accent">вкусно</span>
                <span className="text-primary"> прямо сейчас</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Быстрая доставка любимых блюд. Свежие продукты, честные цены, безопасная оплата
              </p>
              <Button
                size="lg"
                className="text-lg px-8 py-6 hover-scale"
                onClick={() => setActiveSection('menu')}
              >
                Смотреть меню
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
              {menuItems.slice(0, 3).map(item => (
                <Card key={item.id} className="overflow-hidden group hover-scale cursor-pointer animate-fade-in">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">{item.price} ₽</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <Button
                      className="w-full"
                      onClick={() => addToCart(item)}
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'menu' && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Наше меню</h2>
            
            {categories.map(category => (
              <div key={category} className="mb-12">
                <h3 className="text-2xl font-bold mb-6">{category}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems
                    .filter(item => item.category === category)
                    .map(item => (
                      <Card key={item.id} className="overflow-hidden group hover-scale cursor-pointer animate-fade-in">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-6 space-y-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <Badge variant="secondary">{item.price} ₽</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                          <Button
                            className="w-full"
                            onClick={() => addToCart(item)}
                          >
                            <Icon name="Plus" size={16} className="mr-2" />
                            В корзину
                          </Button>
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
          <p>&copy; 2024 Вкусно и точка. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;