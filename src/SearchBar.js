import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    IconButton,
    Divider,
    useMediaQuery,
    Autocomplete,
    TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import UserProfile from './UserProfile';
import SideNavDrawer from './SideNavDrawer';
import UserAvatarLabel from './UserAvatarLabel';
import { Link } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { loggedInUserAtom } from './atoms/UserAtom';
import { backendService } from './services/backendServices';

const SearchBar = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:1200px)');
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const loggedInUser = useAtomValue(loggedInUserAtom);
    const [searchOptions, setSearchOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const getGroupsList = async () => {
            try {
                const response = await backendService.getAllGroupsOfUser(loggedInUser.userId);
                setSearchOptions(response || []);
            } catch (err) {
                console.log("Error constructing Group options in SearchBar " + err);
            }
        };
        getGroupsList();
    }, [loggedInUser]);

    const handleMenuClick = () => {
        setIsSideNavOpen(true);
    };

    const handleSideNavClose = () => {
        setIsSideNavOpen(false);
    };

    const handleOptionSelect = (event) => {
        setInputValue('');
    };

    return (
        <Box
            sx={{
                position: 'sticky',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-between",
                borderRadius: '20px',
                gap: isSmallScreen ? '5px' : '10px',
                zIndex: 1000,
                backgroundColor: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            {isMediumScreen && (
                <IconButton onClick={handleMenuClick} aria-label="open menu">
                    <MenuIcon sx={{ fontSize: isSmallScreen ? 30 : 40 }} />
                </IconButton>
            )}

            <Paper
                sx={{
                    flex: isSmallScreen ? 0.9 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    width: isSmallScreen ? '100%' : 'auto',
                }}
            >
                <Autocomplete
                    freeSolo
                    disableClearable
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                    onChange={(e)=>handleOptionSelect(e)}
                    getOptionLabel={(option) => option.groupName || ''}
                    options={searchOptions}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search for a group"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <IconButton type="button" aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                ),
                                'aria-label': 'search',
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '20px',
                                    fontSize: isSmallScreen ? '0.9rem' : '1rem',
                                },
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <li {...props} style={{ px: 3 }}>
                            <Link
                                to={`/expenses/group/${option.groupId}`}
                                style={{
                                    display: 'flex',
                                    textDecoration: 'none',
                                    width: '100%',
                                    alignItems: 'center',
                                }}
                            >
                                <UserAvatarLabel userName={option.groupName} />
                            </Link>
                        </li>
                    )}
                    sx={{
                        flex: 1,
                    }}
                />
            </Paper>

            {!isSmallScreen && (
                <Divider orientation="vertical" flexItem sx={{ my: "15px" }} />
            )}
            <UserProfile />

            <SideNavDrawer isOpen={isSideNavOpen} onClose={handleSideNavClose} />
        </Box>
    );
};

export default SearchBar;
