import useGameInfoGrid from '../../organisms/GameInfoList/useGameInfoGrid'
import PageTitleWrapper from '@/components/atoms/PageTitleWrapper'
import GameInfoList from '@/components/organisms/GameInfoList'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function Hobbies() {
	const { ownedGames, isLoading } = useGameInfoGrid()
	return (
		<main>
			<PageTitleWrapper>Hobbies</PageTitleWrapper>
			<section className="flex flex-col items-center m-0 md:m-auto">
				<h4>Steam ライブラリ</h4>
				<ul className="flex flex-col gap-1 bg-gray-100 w-full h-full overflow-x-hidden overflow-y-auto">
					{isLoading ? (
						<LoadingSpinner />
					) : (
						<GameInfoList ownedGames={ownedGames} />
					)}
				</ul>
			</section>
		</main>
	)
}
