export default function Home() {
  const h1 = "Have you been zoning out lately? No worries we've got your back!"
  const p = "Elevate your productivity with our comprehensive suite of tools. Designed to foster deep focus and prevent burnout."
  
  return (
    <main className="bg-stone-50 dark:bg-stone-950 text-stone-950 dark:text-stone-50">
      <section className="text-center gap-y-6 h-screen p-10 flex flex-col justify-center items-center">
        <h1 className="text-4xl max-w-6xl font-bold text-center">{h1}</h1>
        <p className="text-lg max-w-5xl">{p}</p>

        <p>If you need a tomato 🍅, <a className="text-red-700 font-medium" href="/pomo">click here</a></p>
      </section>
    </main>
  );
}
