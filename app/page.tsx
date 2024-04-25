export default function Home() {
  const h1 = "Have you been zoning out lately? No worries we've got your back!"
  const p = "Boost your productivity using the smartest and most curated tools. We glue you to your work, not to our app."
  
  return (
    <main className="bg-stone-50 dark:bg-stone-950 text-stone-950 dark:text-stone-50">
      <section className="text-center gap-y-6 h-screen p-10 flex flex-col justify-center items-center">
        <h1 className="text-4xl max-w-xl font-bold text-center">{h1}</h1>
        <p className="text-lg max-w-sm md:max-w-lg">{p}</p>
        <p>If you need a tomato 🍅, <a className="text-red-700 font-medium" href="/pomo">click here</a></p>
      </section>
    </main>
  );
}
