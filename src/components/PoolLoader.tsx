type PoolLoaderProps = {
  label?: string
  leaving?: boolean
  intro?: boolean
}

export default function PoolLoader({ label = 'Filling your pool…', leaving = false, intro = false }: PoolLoaderProps) {
  return (
    <div className={`pool-loader${intro ? ' pool-loader--intro' : ''}${leaving ? ' is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="pool-loader__content">
        <div className="pool-loader__glow" aria-hidden="true" />
        <div className="pool-loader__badge" aria-hidden="true">
          <img className="pool-loader__empty-logo" src="/favicon.svg" alt="" />
          <div className="pool-loader__water">
            <div className="pool-loader__water-logo">
              <img src="/favicon.svg" alt="" />
            </div>
            <svg className="pool-loader__wave pool-loader__wave--front" viewBox="0 0 400 32" preserveAspectRatio="none">
              <path d="M0 16 Q50 0 100 16 T200 16 T300 16 T400 16 V32 H0Z" />
            </svg>
            <svg className="pool-loader__wave pool-loader__wave--back" viewBox="0 0 400 32" preserveAspectRatio="none">
              <path d="M0 18 Q50 4 100 18 T200 18 T300 18 T400 18 V32 H0Z" />
            </svg>
          </div>
        </div>
        <div className="pool-loader__lane" aria-hidden="true">
          <span />
        </div>
        <p className="pool-loader__label">{label}</p>
      </div>
    </div>
  )
}