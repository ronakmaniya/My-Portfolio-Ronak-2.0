import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex flex-col gap-7 pb-4 pt-2">
      <header className="rounded-[24px] border border-edge bg-paper-strong p-8 shadow-soft max-[720px]:p-6">
        <p className="mb-2 text-[12px] uppercase tracking-[2px] text-accent-strong">404</p>
        <h1 className="text-[clamp(2.4rem,3.5vw,3.6rem)] leading-[1.15]">Page not found</h1>
        <p className="text-[1.05rem] text-ink-soft max-w-[540px]">The page you are looking for does not exist.</p>
      </header>
      <Link className="btn btn-ghost" to="/">
        Go back home
      </Link>
    </div>
  )
}

export default NotFound
