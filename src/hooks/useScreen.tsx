import { useEffect, useState } from 'react';

// Ekran boyutları için bir interface tanımla
interface ScreenSize {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

function useScreenHook(): ScreenSize {
    const [screenSize, setScreenSize] = useState<ScreenSize>({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });

    useEffect(() => {
        const handleResize = () => {
            const width: number = window.innerWidth;
            setScreenSize({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024,
            });
        };

        // Pencere boyutu değiştiğinde handleResize fonksiyonunu çağır
        window.addEventListener('resize', handleResize);

        // İlk renderda da doğru değerleri ayarla
        handleResize();

        // Cleanup fonksiyonu. Bu fonksiyon, component unmount edildiğinde çağrılır.
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenSize;
}

export default useScreenHook;
