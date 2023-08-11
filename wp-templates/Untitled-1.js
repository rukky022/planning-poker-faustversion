import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  SEO,
} from '../components';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { PokerCard } from '../components/PokerCard';

export default function Component() {
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  // function onPokerCardClick(textValue) {
  //   setIsClicked(current => !current);
  //   if(isClicked && localStorage.getItem("userVote")) {
  //       localStorage.removeItem("userVote");
  //   } else {
  //       localStorage.setItem("userVote", textValue);
  //   }
  // }


  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />
      <Main>

        <Container sx={{ display: 'flex', flexDirection: 'column'}}>
          <Grid container sx={{p: '0 1rem', display: 'flex', justifyContent: 'center', m: '4rem 0 8rem 0' }}>
            <Card sx={{ backgroundColor: 'white', border: '3px solid #1F4451' }}>
                <CardContent sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                <Typography sx={{fontSize: 18, p: '1.5rem 2rem' }} color='#1F4451'>
                    Pick your card
                </Typography>
                </CardContent>
            </Card>
          </Grid>

          <Grid container sx={{ display: 'flex', justifyContent: 'center'}} >
            <PokerCard textValue='XS'></PokerCard>
            
            <PokerCard textValue='S'></PokerCard>
            
            <PokerCard textValue='M'></PokerCard>
            
            <PokerCard textValue='L'></PokerCard>

            <PokerCard textValue='XL'></PokerCard>
          </Grid>

        </Container>
      </Main>
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};


<Grid container sx={{ display: 'flex', justifyContent: 'center'}} >
<PokerCard textValue='XS' isClicked={isClicked} onClick={() => {
  setIsClicked(current => !current);
  if(isClicked && localStorage.getItem("userVote")) {
      localStorage.removeItem("userVote");
  } else {
      localStorage.setItem("userVote", 'XS');
  }}}></PokerCard>

<PokerCard textValue='S' isClicked={isClicked} onClick={() => {
  setIsClicked(current => !current);
  if(isClicked && localStorage.getItem("userVote")) {
      localStorage.removeItem("userVote");
  } else {
      localStorage.setItem("userVote", 'S');
  }}}></PokerCard>

<PokerCard textValue='M' isClicked={isClicked} onClick={() => {
  setIsClicked(current => !current);
  if(isClicked && localStorage.getItem("userVote")) {
      localStorage.removeItem("userVote");
  } else {
      localStorage.setItem("userVote", 'M');
  }}}></PokerCard>

<PokerCard textValue='L' isClicked={isClicked} onClick={() => {
  setIsClicked(current => !current);
  if(isClicked && localStorage.getItem("userVote")) {
      localStorage.removeItem("userVote");
      this.isClicked = true;
  } else {
      localStorage.setItem("userVote", 'L');
  }}}></PokerCard>

<PokerCard textValue='XL' isClicked={isClicked} onClick={() => {
  setIsClicked(current => !current);
  if(isClicked && localStorage.getItem("userVote")) {
      localStorage.removeItem("userVote");
  } else {
      localStorage.setItem("userVote", 'XL');
  }}}></PokerCard>
</Grid>