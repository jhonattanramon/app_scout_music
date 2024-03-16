import { ReactNode } from "react"

export const Text = {
    h1: ({children}:{children: ReactNode}) => (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {children}
      </h1>
    ),
    h2:({children}:{children: ReactNode}) => (
      <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:tex-2xl">
        {children}
      </h2>),
    h3: ({children}:{children: ReactNode}) =>  (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {children}
        </h3>
      ),
    TextBody: ({children}:{children: ReactNode}) =>  (
      <p className="scroll-m-20 text-sm font-semibold tracking-tight">
        {children}
      </p>
    )
}
