// 1. Définir l'interface pour les props que ce composant attend
interface UserInfoCardProps {
  name: string; // Une simple prop 'name' de type string
}

// si je récupère ma props sans destructuration

// const UserInfoCard = (props: UserInfoCardProps) => {
//   // Ici, 'props' est un objet. Dans notre cas, il serait : { name: "Alexandre" }
//   // Pour accéder à la valeur de 'name', vous feriez :
//   return (
//     <div className="card shadow-sm">
//       <div className="card-body">
//         <h5 className="card-title text-primary">Carte Utilisateur</h5>
//         <p className="card-text">
//           Bienvenue, <strong>{props.name}</strong> !{" "}
//           {/* Utilisation de props.name */}
//         </p>
//       </div>
//     </div>
//   );
// };


// voilà pourquoi on utilise la destructuration pour récupérer la propriété name du props
const UserInfoCard = ({name}: UserInfoCardProps) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary">Carte Utilisateur</h5>
        <p className="card-text">
          Bienvenue, <strong>{name}</strong> !
        </p>
        {/* On pourrait ajouter plus d'infos plus tard si 'name' était un objet */}
      </div>
    </div>
  );
};

export default UserInfoCard;
