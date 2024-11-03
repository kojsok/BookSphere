'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { fetchSession } from '@/utils/actions/fetchSession';
import { Input } from '@/components/ui/input';
import { Copy, Share } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import QrCode from '@/components/qrcode';

const QRCodeGenerator = () => {
    const [userID, setUserID] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [isQrCodeGenerated, setIsQrCodeGenerated] = useState(false); // новое состояние

    const handleGenerateQRCode = () => {
        setIsQrCodeGenerated(true); // обновляем состояние при нажатии кнопки
        if (userID) {
            const qrCodeText = `https://booksphera.ru/${userID}`;
            setInputValue(qrCodeText);
        }
    };

    const handleCopy = async () => {
        if (inputValue) {
            await navigator.clipboard.writeText(inputValue);
        }
    };

    const handleShare = async () => {
        if (navigator.share && userID) {
            try {
                const qrCodeText = `https://booksphera.ru/${userID}`;
                await navigator.share({
                    title: 'Моя страница для записи:',
                    text: 'Вы можете перейти на мою страницу по этой ссылке и записаться на услугу. Спасибо за ваш выбор!',
                    url: qrCodeText,
                });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('Ошибка при попытке поделиться либо пользователь прервал sharing:', error.message);
                } else {
                    console.error('An unknown error occurred:', error);
                }
                if ((error as Error)?.name !== 'AbortError') {
                    console.error('Ошибка при попытке поделиться:', error);
                }
            }
        } else {
            alert('Web Share API не поддерживается вашим устройством.');
        }
    };

    useEffect(() => {
        const getSession = async () => {
            const { session, error } = await fetchSession();
            if (error) {
                setError(error);
            } else if (session) {
                setUserID(session.id);
            }
        };
        getSession();
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="flex flex-col items-center p-4 space-y-4 w-full max-w-md mx-auto">
            {/* Показываем QR код только если он был сгенерирован */}
            {isQrCodeGenerated && userID && <QrCode ownerId={userID} />}

            <Button onClick={handleGenerateQRCode} variant="default" className="w-full max-w-xs animate-bounce duration-800 hover:animate-pulse">
                Сгенерировать QR-код
            </Button>

            <div className="flex flex-row w-full max-w-xs mx-auto">
                <div className="relative w-full max-w-xs mx-auto flex items-center">
                    <Input
                        type="text"
                        placeholder="QR код не сгенерирован"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="pr-12"
                    />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={handleCopy}
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2"
                                >
                                    <Copy className="w-5 h-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Скопировать</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={handleShare} variant="ghost" size="icon">
                                <Share className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Поделиться</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default QRCodeGenerator;