export default function Post({ post }) {
    if (!post) return


    <div className="Connexion">

        <h2>Connexion</h2>

        <form onSubmit={handleSubmit}></form>

        <input type="email"
            placeholder="email"
            value={email}
        />


        <input type="password"
            placeholder="*******"
            value={password}
        />

        <button className="Se_connecter"
            placeholder="Se connecter"
        ></button>

        <button className="creerCompte"
            placeholder="Se créer un compte"
        ></button>

    </div>
}
