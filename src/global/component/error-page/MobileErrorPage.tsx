import PageWrapper from "../page-wrapper/MobilePageWrapper";

export default function ErrorPage() {
    return (
        <PageWrapper>
            <div className="w-full h-auto my-10 flex flex-col justify-center items-center gap-10">
                <p className="text-6xl font-bold">404 Page Not Found :(</p>
                <p className="text-3xl font-thin italic">If the problem persists, please send me an email and I'll look into it.</p>
            </div>
        </PageWrapper>
    )
}