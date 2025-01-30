'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import 'flag-icons/css/flag-icons.min.css';

interface CoffeeDetails {
  name: string;
  region: string;
  farm: string;
  processing: string;
  variety: string;
  altitude: string;
  flavorNotes: string[];
}

interface CoffeeCardProps {
  id: string;
  details: CoffeeDetails;
  index: number;
}

export default function CoffeeCard({ id, details, index }: CoffeeCardProps) {
  const t = useTranslations('coffee.details');

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2
      }
    }
  };

  const getCountryFlag = (id: string) => {
    const flagMap = {
      'colombia': 'co',
      'honduras': 'hn',
      'indonesia': 'id',
      'rwanda': 'rw'
    };

    const country = Object.keys(flagMap).find(key => id.startsWith(key));
    const flagCode = country ? flagMap[country as keyof typeof flagMap] : 'co';
    
    return (
      <span className={`fi fi-${flagCode}`} />
    );
  };

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="relative w-full rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        {/* Header Section */}
        <div className="relative p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/40">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 overflow-hidden rounded-lg shadow-inner flex items-center justify-center bg-white/90 dark:bg-black/20">
              {getCountryFlag(id)}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{details.name}</h3>
          </div>
          
          {/* Region with small flag */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className={`fi fi-${getCountryFlag(id).props.className.split('-')[2]} w-4 h-4`} />
            <span>{details.region}</span>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-4">
          {/* Farm */}
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-primary-600 dark:text-primary-400">{t('farm')}</h4>
              <p className="mt-1 text-gray-800 dark:text-gray-200">{details.farm}</p>
            </div>
          </div>

          {/* Processing Method */}
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-primary-600 dark:text-primary-400">{t('processing')}</h4>
              <p className="mt-1 text-gray-800 dark:text-gray-200">{details.processing}</p>
            </div>
          </div>

          {/* Variety */}
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-primary-600 dark:text-primary-400">{t('variety')}</h4>
              <p className="mt-1 text-gray-800 dark:text-gray-200">{details.variety}</p>
            </div>
          </div>

          {/* Altitude */}
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-primary-600 dark:text-primary-400">{t('altitude')}</h4>
              <p className="mt-1 text-gray-800 dark:text-gray-200">{details.altitude}</p>
            </div>
          </div>

          {/* Flavor Notes */}
          <div>
            <h4 className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">{t('flavorNotes')}</h4>
            <div className="flex flex-wrap gap-2">
              {details.flavorNotes.map((note, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-100 rounded-full"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}