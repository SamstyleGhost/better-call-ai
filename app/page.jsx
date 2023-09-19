import { Disclaimer, InfoTab, Chat } from "./components"

export default function Home() {
  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row-reverse">
        <div className="flex flex-col w-full md:w-3/4">
          <Disclaimer />
          <hr className="my-2"/>
          <Chat />
        </div>
        <InfoTab />
      </div>
    </div>
  )
}
