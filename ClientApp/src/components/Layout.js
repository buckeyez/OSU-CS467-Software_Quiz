import React/*, { Component }*/ from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import * as ROUTES from '../constants/routes';

// export default class Layout extends Component {
//   static displayName = Layout.name;

//   render() {
//     return (
//       <div>
//         <NavMenu />
//         <Container>{this.props.children}</Container>
//       </div>
//     );
//   }
// }

export default function Layout(props) {
  const location = useLocation();
  let isNavShown = true;

  //Declare paths you don't want the navmenu to render on
  const isCandidateHome = location.pathname.includes(ROUTES.CANDIDATE_HOME);
  const isQuizDetails = location.pathname.includes(ROUTES.QUIZ_DETAILS);

  //Add path you don't want nav menu to render on in the IF condition
  if (isCandidateHome || isQuizDetails) {
    isNavShown = false;
  }

  return (
    <div>
      {isNavShown ? <NavMenu /> : null}
      <Container>{props.children}</Container>
    </div>
  );
}
