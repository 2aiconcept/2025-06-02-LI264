const Es6Lab = () => {
  const pageTitle = "ES6 Lab";
  // var age = 25;
  let age = 25;
  age = 26; // Modification possible
  const name = "chris";
  // name = "juju;"; // provoque une erreur
  console.log(age);
  console.log(name);

  // Problème : portée (scope) globale
  for (let i = 0; i < 3; i++) {
    // ...
  }
  // console.log(i); // accessible en dehors du block avec var mais innaccessible avec let

  // fonctions
  function addNumbers(a: number, b: number): number {
    console.log(a + b);
    return a + b;
  }

  // Expression
  const multiply = function (a: number, b: number): number {
    return a * b;
  };

  // arrow function syntaxe
  const division = (a: number, b: number): number => {
    console.log(a / b);
    return a / b;
  };

  // this dans les fonctions
  const obj = {
    name: "Jean",
    sayHello: function () {
      console.log("Hello " + this.name);
      // this = obj
    },
  };
  const obj2 = {
    name: "Jean",
    sayHello: () => {
      // console.log("Hello " + this.name);
      // this != obj (context parent ex : si obj2 est dans une Class)
    },
  };

  return (
    <>
      <h5>{pageTitle}</h5>
      {/* const et let */}
      <div className="card">
        <div className="card-header bg-primary text-white">
          const var et let
        </div>
        <div className="card-body">
          <p className="card-text">Mutabilité et portée.</p>
          <p className="card-text">
            var : effet de remontée de variable en dehors d'un bloc , ce qui la
            rend accessible au niveau global du composant alors que nous nous
            attendons à ce qu'elle ne soit accessible que localement dans le
            bloc dans lequel elle est créée. Ce comportement n'existe pas avec
            let.
          </p>
          <p className="card-text">
            const : N'est pas mutable. Changer sa valeur provoque une erreur.
          </p>
        </div>
      </div>

      {/* Arrow functions */}
      <div className="card mt-3">
        <div className="card-header bg-primary text-white">
          Arrow functions vs functions
        </div>
        <div className="card-body">
          <p className="card-text">Syntaxe.</p>
          Function syntaxe
          <div className="bg-light p-2 mb-3 border border-primary lang-js">
            <code>{`function () {}`}</code>
          </div>
          <br />
          Arrow function syntaxe
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{` () => {}`}</code>
          </pre>
          <hr />
          expression function sans params et sans return
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`const name = function() {}`}</code>
          </pre>
          <br />
          Arrow function
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`const name = () => {}`}</code>
          </pre>
          <hr />
          expression function avec 1 param et sans return
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`const maFn = function(param) => {}`}</code>
          </pre>
          <br />
          Arrow function
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`const maFn = (param) => {}`}</code>
          </pre>
          <br />
          Parenthèses optionnelles si un seul param
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`const maFn = param => {}`}</code>
          </pre>
          <hr />
          expression function avec 2 params et sans return
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`const maFn = function(param1, param2) => {}`}</code>
          </pre>
          <br />
          Arrow function
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`const maFn = (param1, param2) => {}`}</code>
          </pre>
          <hr />
          Avec 1 param et 1 return
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`const maFn = function(param1) => {return param1 + 10}`}</code>
          </pre>
          <br />
          Arrow function
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`const maFn = (param1) => {return param1 + 10}`}</code>
          </pre>
          <br />
          Si une seule ligne dans les accolades, accolades optionnelles et
          return implicite
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`const maFn = (param1) => param1 + 10`}</code>
          </pre>
          <br />
          Et parenthèses optionnelles si un seul param
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`const maFn = param1 => param1 + 10`}</code>
          </pre>
          <hr />
          this dans une function
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const obj = {
              name: 'Jean',
              sayHello: function() {
                console.log('Hello ' + this.name);
                // this = obj 
                }
              };
            `}</code>
          </pre>
          <br />
          This dans une arrow function
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const obj = {
              name: 'Jean',
              sayHello: () => {
                console.log('Hello ' + this.name); 
                // this != obj (context parent)
                }
              };
            `}</code>
          </pre>
          <hr />
          <p className="card-text">
            Utilisation de la fonction multiply : {multiply(2, 2)}
          </p>
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              addNumbers(1, 2);
            }}
          >
            call addNumbers
          </button>
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              division(1, 2);
            }}
          >
            call addNumbers
          </button>
        </div>
      </div>

      {/* destructuring  */}
      <div className="card mt-3">
        <div className="card-header bg-primary text-white">
          Déstructuration d'objets
        </div>
        <div className="card-body">
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const obj = {
              name: 'Jean',
              age: 20,
              city: 'paris'
              };
            `}</code>
          </pre>
          <p className="card-text">Sans destructuring.</p>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const name = obj.name;
            const age = obj.age;
            const city = obj.city;
            `}</code>
          </pre>
          <p className="card-text">Avec destructuring.</p>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const {name, age, city} = obj;
            // extraction directe
            `}</code>
          </pre>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const {name, age, city, country = 'France'} = obj;
            // extraction directe + créa nouvelle propriété avec val France
            `}</code>
          </pre>
        </div>
      </div>

      {/* destructuration de tableaux */}
      <div className="card mt-3">
        <div className="card-header bg-primary text-white">
          Déstructuration de tableaux
        </div>
        <div className="card-body">
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const colors = ['rouge', 'vert', 'bleu'];
            `}</code>
          </pre>
          <p className="card-text">Sans destructuring.</p>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const col0 = colors[0];
            const col1 = colors[1];
            const col2 = colors[2];
            `}</code>
          </pre>
          <p className="card-text">Avec destructuring.</p>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const [col0, col1, col2] = colors;
            // extraction des données
            `}</code>
          </pre>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const [col0, , col2] = colors;
            // ignorer des elements
            `}</code>
          </pre>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const [col0, col1, col2, col3 = 'orange'] = colors;
            // extraction + crea une propriete avec val orange
            `}</code>
          </pre>
        </div>
      </div>

      {/* spreed operators */}
      <div className="card mt-3">
        <div className="card-header bg-primary text-white">
          Spreed operators (opérateurs de décomposition) avec les tableaux
        </div>
        <div className="card-body">
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              const arr1 = [1, 2, 3];
              const arr2 = [4, 5, 6];
            `}</code>
          </pre>
          <p className="card-text">Sans spreed operators.</p>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              const combined = arr1.concat(arr2);
              // concatenation
            `}</code>
          </pre>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              const copy = arr1.slice();
              // créé une copie avec nouvelle référence
            `}</code>
          </pre>
          <p className="card-text">Avec spreed operators.</p>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const combined = [...arr1, ...arr2];
            // concatenation
            `}</code>
          </pre>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const copy = [...arr1];
            // copie avec nouvelle référence
            `}</code>
          </pre>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
            const newArr = [...arr1, 4, 5];
            const newArr2 = [0, ...arr1, 4]
            // récupération et ajout d'éléments
            `}</code>
          </pre>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header bg-primary text-white">
          Spreed operators (opérateurs de décomposition) avec des objets
        </div>
        <div className="card-body">
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              const user = { name: 'Jean', age: 25 }
            `}</code>
          </pre>
          <p className="card-text">Sans spreed operators.</p>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              // Fusion d'objets
              const fullUser = Object.assign({}, user, address);
            `}</code>
          </pre>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              // Modification
              const updatedUser = Object.assign({}, user, {
                age: 26
              });
            `}</code>
          </pre>
          <p className="card-text">Avec spreed operators.</p>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              // Fusion d'objets
              const fullUser = { ...user, ...address };
            `}</code>
          </pre>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              // Modification (immutable)
              const updatedUser = { ...user, age: 26 };
            `}</code>
          </pre>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              // Ajout de propriétés
              const userWithEmail = { 
                ...user, 
                email: 'jean@example.com' 
              };
            `}</code>
          </pre>
        </div>
      </div>

      {/* exemples pratiques combinés */}
      <div className="card mt-3">
        <div className="card-header bg-primary text-white">
          Exemples pratiques combinés
        </div>
        <div className="card-body">
          <h6>Exemple 1 : Traitement de données</h6>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              const users = [
                { id: 1, name: 'Jean', age: 25, city: 'Paris' },
                { id: 2, name: 'Marie', age: 30, city: 'Lyon' },
                { id: 3, name: 'Paul', age: 35, city: 'Nice' }
              ];
            `}</code>
          </pre>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              // Extraction des noms avec arrow function + destructuring
              const names = users.map(({ name }) => name);
              // ['Jean', 'Marie', 'Paul']
            `}</code>
          </pre>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              // Utilisateurs adultes avec spread + filter
              const adults = users
                .filter(({ age }) => age >= 20)
                .map(user => ({ ...user, status: 'adult' }));
            `}</code>
          </pre>
          <p className="card-text">Avec spreed operators.</p>
          <pre className="bg-light p-2 mb-3 border border-primary">
            <code>{`
              // fonction avec un paramètre obligatoire + params indéfini
              const myFn = (param, ...params) {
                console.log(param);
                console.log(param[0]); // params[1], etc...
                // params[0] existe même si aucun argument passé
              }
            `}</code>
          </pre>
        </div>
      </div>
    </>
  );
};

export default Es6Lab;
