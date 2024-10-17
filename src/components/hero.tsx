export default function Header() {
    return (
      <div className="flex flex-col gap-16 items-center">
        <div className="flex gap-8 justify-center items-center">
          <span className="border-l rotate-45 h-6" />
        </div>
        <h1 className="text-4xl lg:text-4xl" >Бронируй легко с BookSphera – одно касание, и готово!</h1>
        <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
          Привет, это BookSphera!
        </p>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      </div>
    );
  }