import {forwardRef} from 'react'
import {Helmet} from "react-helmet-async"

const Page = forwardRef(({children, title=''}, ref)=>(
	<>
		<Helmet>
			<title>
				{`CodeLearner | ${title}`}
			</title>
		</Helmet>

		<div ref={ref}>
			{children}
		</div>
	</>
))

export default Page