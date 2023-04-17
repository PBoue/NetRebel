import { Stage, StageProps } from '@/modules/Stage'
import { Section, SectionProps } from '@/elements/Section'
import { CategoryDisplay, CategoryDisplayProps } from '@/modules/CategoryDisplay'

const stageProps: StageProps = {
    headline: 'Cybernoise',
    text: 'Using ChatGPT and Midjourney to rework scientific papers on artificial intelligence so that they appear exaggeratedly optimistic and futuristic, just like the majority of popular science magazines'
}

const sectionProps: SectionProps = {
    headline: "transforming the norm: design the future, today!",
    subheadline: "we are a small yet dynamic team of strategy, development, and consulting experts."
}

export default function Home({}) {

    return (
        <>
            <Stage {...stageProps} />
            <Section {...sectionProps} />

        </>
    )
}
