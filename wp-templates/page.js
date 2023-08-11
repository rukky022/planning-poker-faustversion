import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  Header,
  Footer,
  Main,
  Container,
  ContentWrapper,
  EntryHeader,
  NavigationMenu,
  FeaturedImage,
  SEO,
} from '../components';
import { Avatar, Card, CardActions, CardContent, Grid, Paper, TextField, Typography } from '@mui/material';
import { PokerCard } from '../components/PokerCard';
import { InputName } from '../components/InputName';
import { useState } from 'react';
import { PPButton } from '../components/PPButton';

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
  const { title, content, featuredImage } = props?.data?.page ?? { title: '' };

  const [username, setUsername] = useState('');
  const [nameSubmitted, setSubmit] = useState(false);
  const [vote, setVote] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [allReady, setAllReady] = useState(false);
  const [cards, showCards] = useState(false);

  let cardBackgroundColor = vote === '' ? '#EEF2F3': '#64828A';

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <Header
        title="Planning Poker"
        description="A WP Engine Story Pointing Tool"
        menuItems={[primaryMenu[0]]}
      />
      <Main>
      <Container sx={{ display: 'flex', flexDirection: 'column'}}>
        {/* <InputName /> */}

        <Card sx={{display: 'flex', justifyContent: 'center', backgroundColor: 'rgb(0,40,56, 0.4)', color: 'rgb(0,40,56)' }}>
            <CardContent>
                <Typography variant="h3">
                    Enter your name
                </Typography>
            </CardContent>
            <CardActions>
                <TextField required id="username" label="Required" defaultValue="Name" onChange={(event) => {setUsername(event.target.value);}}/>
                <PPButton text='Join' clickFunction={() => {localStorage.setItem("userName", username); setSubmit(true);}}/>
            </CardActions>
        </Card>

        {nameSubmitted && (
          <>
          <Grid container sx={{p: '0 1rem', display: 'flex', justifyContent: 'center', m: '4rem 0' }}>
            <Card sx={{ backgroundColor: 'white', border: '3px solid #1F4451' }}>
                <CardContent sx={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                {!allReady ? 
                  <Typography sx={{fontSize: 18, p: '1.5rem 2rem' }} color='#1F4451'>
                      Pick your card
                  </Typography>
                  :
                  <PPButton text='Reveal Cards' clickFunction={() => {showCards(current => !current)}}/>
                }
                </CardContent>
            </Card>
            <Grid container sx={{p: '1rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
              {!cards ? 
                <Paper variant={vote !== '' ? "outlined": "contained"} sx={{ width: '3rem', height: '5rem', backgroundColor: cardBackgroundColor }} />
              :
                <Paper variant="outlined" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '3rem', height: '5rem', backgroundColor: '#EEF2F3' }}>{vote}</Paper>
              }
              <Typography variant='body2'>{username}</Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ display: 'flex', justifyContent: 'center'}} >
            <PokerCard textValue='XS'
            variantValue={isClicked ? (vote == 'XS' ? 'contained' : 'outlined') : 'outlined'} 
            colorValue={isClicked ? (vote == 'XS' ? 'white' : '' ) : ''} 
            onClick={()=> {
              if(localStorage.getItem("userVote") === 'XS') {
                setVote('');
                localStorage.removeItem("userVote");
                setAllReady(false);
              } else {
                setVote('XS');
                setIsClicked(true);
                localStorage.setItem("userVote", 'XS');  
                setAllReady(true);
              }
          }}></PokerCard>
            
            <PokerCard textValue='S'
            variantValue={isClicked ? (vote == 'S' ? 'contained' : 'outlined') : 'outlined'} 
            colorValue={isClicked ? (vote == 'S' ? 'white' : '' ) : ''} 
            onClick={()=> {
              if(localStorage.getItem("userVote") === 'S') {
                setVote('');
                localStorage.removeItem("userVote");
                setAllReady(false);
              } else {
                setVote('S');
                setIsClicked(true);
                localStorage.setItem("userVote", 'S');  
                setAllReady(true);
              }
          }}></PokerCard>
            
            <PokerCard textValue='M'
            variantValue={isClicked ? (vote == 'M' ? 'contained' : 'outlined') : 'outlined'} 
            colorValue={isClicked ? (vote == 'M' ? 'white' : '' ) : ''} 
            onClick={()=> {
              if(localStorage.getItem("userVote") === 'M') {
                setVote('');
                localStorage.removeItem("userVote");
                setAllReady(false);
              } else {
                setVote('M');
                setIsClicked(true);
                localStorage.setItem("userVote", 'M');  
                setAllReady(true);
              }
          }}></PokerCard>
            
            <PokerCard textValue='L'
            variantValue={isClicked ? (vote == 'L' ? 'contained' : 'outlined') : 'outlined'} 
            colorValue={isClicked ? (vote == 'L' ? 'white' : '' ) : ''} 
            onClick={()=> {
              if(localStorage.getItem("userVote") === 'L') {
                setVote('');
                localStorage.removeItem("userVote");
                setAllReady(false);
              } else {
                setVote('L');
                setIsClicked(true);
                localStorage.setItem("userVote", 'L');
                setAllReady(true);
              }
          }}></PokerCard>

            <PokerCard textValue='XL'
            variantValue={isClicked ? (vote == 'XL' ? 'contained' : 'outlined') : 'outlined'} 
            colorValue={isClicked ? (vote == 'XL' ? 'white' : '' ) : ''} 
            onClick={()=> {
              if(localStorage.getItem("userVote") === 'XL') {
                setVote('');
                localStorage.removeItem("userVote");
                setAllReady(false);
              } else {
                setVote('XL');
                setIsClicked(true);
                localStorage.setItem("userVote", 'XL');  
                setAllReady(true);
              }
          }}></PokerCard>
          </Grid>
          </>
        )}

        </Container>
      </Main>
      {/* <Footer title={siteTitle} menuItems={footerMenu} /> */}
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${FeaturedImage.fragments.entry}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
    }
    generalSettings {
      ...BlogInfoFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
