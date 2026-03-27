export default async function Brand({ className }) {

    return (
        <div className={`flex flex-col pb-8 ${className}`}>
            <a href="/">
                <h1 className="font-jaro text-7xl lowercase">Ha<span className="text-red-500">d</span>es</h1>
            </a>
            <span className="font-kode-mono lowercase">A video game death tracker</span>
        </div>
    );
}