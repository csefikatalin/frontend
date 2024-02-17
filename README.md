# REACT frontend laravel Breeze API végpontokhoz

## Bejelentkezés és Regisztráció

1. **laravel telepítése**: composer create-project laravel/laravel laravel-breeze-api
2. **breeze telepítése**: composer require laravel/breeze --dev
3. **breeze api telepítése**: php artisan breeze:install api
4. a routes/auth.php fájlban vannak a használható végpontok. Ehhez kapcsolódunk frontenden.
5. env fájlban állítsuk be az adatbázis elérhetőségeket.
6. migráljuk az adatbázist
7. env. php ban be kell állítani a forntend elérés értékeit:
   APP_URL=http://localhost:8000
   FRONTEND_URL=http://localhost:3000
   SANCTUM_STATEFUL_DOMAINS=localhost:3000
   SESSION_DOMAIN=localhost

## Frontend létrehozása és beállításai

Hozzuk létre a react projektet és telepítsük hozzá a React routert, bootstrapet és az axiost

### React telepítése:

    npx create-react-app frontend

Nyisd meg VS Code-ban és indítsd el!

    npm start

### Csomagok telepítése

-   react router telepítése, majd importáljuk az index.js fájlba és helyezük el a <BrowserRouter> komponenst az App komponens köré

    npm install react-router-dom

    import { BrowserRouter } from "react-router-dom";

    <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </React.StrictMode>

-   bootstrap telepítése,majd importáljuk az index.js fájlba.

    npm install react-bootstrap bootstrap

-   axios
    npm install axios

### Mappastruktúra kialakítása

-   pages: itt fogjuk tárolni az egyes oldalakat
-   layouts: itt fogjuk tárolni a különböző jogosultságokhoz tartozó menüket, elrendezéseket.
-   components: itt fogjuk tárolni az oldalakat felépítő komponenseket
-   api: itt fogjuk tárolni az axios beállításait
-   contexts: itt fogjuk tárolni a contextusokat, providereket.

### Route és a navigáció

#### Oldalak létrehozása

A **pages** mappában hozzuk létre az alábbi oldalakat egy alap function komponens segítségével

-   Kezdolap
-   Bejelentkezes
-   Regisztracio

#### App.js fájlban alakítsuk ki az útvonalakat

    import { Route, Routes } from "react-router-dom";
    import Kezdolap from "./pages/Kezdolap";
    import Bejelentkezes from "./pages/Bejelentkezes";
    import Regisztracio from "./pages/Regisztracio";
    import VendegLayout from "./layouts/VendegLayout";

    function App() {
        return (
            <Routes>
                <Route path="/" element={<VendegLayout />}>
                    <Route index element={<Kezdolap />} />
                    <Route path="bejelentkezes" element={<Bejelentkezes />} />
                    <Route path="regisztracio" element={<Regisztracio />} />

                </Route>
            </Routes>
        );
    }

    export default App;

#### Menü kialakítása a Navigacio komponensben

    import React from "react";
    import { Link } from "react-router-dom";

    export default function Navigacio() {
        return (
            <nav className="navbar navbar-expand-sm bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="navbar-item">
                            <Link className="nav-link" to="/">
                                Kezdőlap
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/bejelentkezes">
                                Bejelentkezés
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="nav-link" to="/regisztracio">
                                Regisztráció
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }

#### Layout kialakítása - VendegLayout létrehozása a layouts mappában

    import React from "react";
    import Navigacio from "../pages/Navigacio";
    import { Outlet } from "react-router-dom";

    export default function VendegLayout() {
        return (
            <>
                <Navigacio />
                <Outlet />
            </>
        );
    }

#### Az App.js-ben állítsuk be a Layoutot a menüpontokhoz.

    import { Route, Routes } from "react-router-dom";
    import Kezdolap from "./pages/Kezdolap";
    import Bejelentkezes from "./pages/Bejelentkezes";
    import Regisztracio from "./pages/Regisztracio";
    import VendegLayout from "./layouts/VendegLayout";

    function App() {
        return (
            <Routes>
                <Route path="/" element={<VendegLayout />}>
                    <Route index element={<Kezdolap />} />
                    <Route path="bejelentkezes" element={<Bejelentkezes />} />
                    <Route path="regisztracio" element={<Regisztracio />} />

                </Route>
            </Routes>
        );
    }

    export default App;

##  Bejelentkezés és Regisztrációs formok létrehozása

### Bejelentkezés form 

A Bejelentkezés oldalon hozzunk létre az alábbi mintának megfelelő formot. 
Minden beviteli mező alatt van egy div, ahova az esetleges hibaüzeneteket jelenítjük meg. 

A Regisztráció feliratra kattintva navigáljunk a regisztráció oldalra. 

<img src="public/readme_kepek/login.PNG" alt="Bejelentkezés képernyőkép">

    import React from "react";
    import { Link } from "react-router-dom";

    export default function Bejelentkezes() {
        return (
            <div className="m-auto" style={{ maxWidth: "400px" }}>
                <h1 className="text-center">Bejelentkezés</h1>
                <form>
                    <div className="mb-3 mt-3">
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="email"
                            name="email"
                        />
                    </div>
                    <div>
                        <span className="text-danger">hiba</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">
                            Jelszó:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="pwd"
                            placeholder="jelszó"
                            name="pwd"
                        />
                        <div>
                            <span className="text-danger">hiba</span>
                        </div>
                    </div>

                    <div className=" text-center">
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>

                        <p>
                            Még nincs felhaszálóneve?
                            <Link className="nav-link text-info" to="/regisztracio">
                                Regisztráció
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        );
    }


### Regisztrációs form 

Hasonló módon hozzuk létre a regisztráció oldal formját is. 

<img src="public/readme_kepek/registracio.PNG" alt="Regisztrációs képernyőkép">



2.  Login és Register formok létrehozása
3.  Regisztráció és a Bejelentkezés logikája
4.  AuthContext létrehozása
5.  Layoutok kialakítása
