import { useQuery, gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Main,
  Container,
  NavigationMenu,
  SEO,
} from '../components';
import { Grid, Typography } from '@mui/material';
import { PPButton } from '../components/PPButton';

export default function Component() {
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  return (
    <>
      <SEO title="Planning Poker" description="A WP Engine Story Pointing Tool" />
      <Header
        title="Planning Poker"
        description="A WP Engine Story Pointing Tool"
        menuItems={[primaryMenu[0]]}
      />
      <Main id="planningPokerMain">
        <Container id="planningPokerContainer">
          <Grid container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
            <Typography variant='h2' sx={{mb: 2}}>Start a Session</Typography>
            <PPButton text='Create game' link='/game'/>
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
