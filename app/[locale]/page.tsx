import { getLocale } from 'next-intl/server';
import Header from '../components/Header';
import CoffeeCard from '../components/CoffeeCard';
import coffeeData from '../../data/coffee-beans.json';

export default async function Home() {
  const locale = await getLocale();

  return (
    <main className="min-h-screen pt-20 pb-12 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              radial-gradient(circle at 25px 25px, rgba(70, 129, 114, 0.2) 2%, transparent 0%),
              radial-gradient(circle at 75px 75px, rgba(70, 129, 114, 0.2) 2%, transparent 0%)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Steam Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-8 h-32 bg-gradient-to-b from-primary-200/20 to-transparent dark:from-primary-400/10"
            style={{
              left: `${15 + i * 20}%`,
              animation: `steam ${3 + i * 0.5}s ease-out infinite`,
              animationDelay: `${i * 0.7}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative">
        {/* Coffee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {coffeeData.coffees.map((coffee, index) => (
            <CoffeeCard
              key={coffee.id}
              id={coffee.id}
              details={coffee[locale as 'en' | 'fa']}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
} 