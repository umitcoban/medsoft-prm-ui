import { Button, Result } from "antd";


const Page = () => {
    return (
        <section className="h-screen w-screen">
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                className="!w-full !h-full"
                extra={<Button type="primary">Back Home</Button>}
            />
        </section>
    )
}

export default Page;