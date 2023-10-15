import { Suspense } from 'react'

import PageTitleWrapper from '@/components/atoms/PageTitleWrapper'
import FetchErrorBoundary from '@/components/layouts/FetchErrorBoundary'
import GameInfoList from '@/components/organisms/GameInfoList'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { styled } from '@/styles/StyleConstants'

const Hobbies = () => (
	<main>
		<PageTitleWrapper>Hobbies</PageTitleWrapper>
		<StyledSection>
			<p>
				PCでゲームをすることで、主に遊ぶゲームのジャンルはFPSかストラテジーです。映画を見たりもします。
			</p>
			<h4>Steam ライブラリ</h4>
			<ul className="flex flex-col gap-2 w-full h-full overflow-x-hidden overflow-y-auto">
				<FetchErrorBoundary>
					<Suspense fallback={<LoadingSpinner />}>
						<GameInfoList />
					</Suspense>
				</FetchErrorBoundary>
			</ul>
		</StyledSection>
	</main>
)

const StyledSection = styled('section', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '60%',
	height: '70%',
	gap: '1rem',
	margin: '5vh auto',
	'@bp2': {
		width: '90%',
	},
})

export default Hobbies
