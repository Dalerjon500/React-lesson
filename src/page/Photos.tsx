import { useEffect, useState } from "react";
import PhotosList from "../component/PhotosList";
import Select, { MultiValue } from 'react-select';
import PageAndLimitPhoto from "../component/PageAndLimitPhoto";
import { Typography } from "@mui/material";
import Loading from "../component/LoadingForUsers";
import { AlbumOption } from "../data";
import usePhoto from "../hooks/usePhoto";

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

interface Album {
    userId: number;
    id: number;
    title: string;
}

function Photos() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [param, setParam] = useState("");
    const { data: photos, loading, pageSize } = usePhoto<Photo>(`/photos?_page=${page}&_limit=${limit}&${param}`);
    const { data: albums } = usePhoto<Album>('/albums');
    const [albumOptions, setAlbumOptions] = useState<AlbumOption[]>([]);
    const totalPages = Math.ceil(pageSize / limit);

    useEffect(() => {
        setAlbumOptions(albums.map(album => ({
            value: album.id,
            label: album.title.trim().split(/\s+/)[0],
            color: '#ffffff'
        })));
    }, [albums]);

    const filterByAlbum = (data: MultiValue<AlbumOption>) => {
        setParam(data.map(item => 'albumId=' + item.value).join("&"));
    };

    return (
        <div className="photo-page" style={{
            padding: '30px 20px',
            background: 'linear-gradient(to right, #0f0f0f, #1a1a1a)',
            minHeight: '100vh'
        }}>
            {loading && <Loading />}

            <div className="container" style={{ maxWidth: '1300px', margin: '0 auto' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px',
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(255, 255, 255, 0.05)',
                    marginBottom: '30px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <div>
                        <Typography variant="h3" sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: 700,
                            fontSize: '2.5rem',
                            background: 'linear-gradient(to right, #ffffff, #cccccc)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            gap: 1
                        }}>
                            Photos
                        </Typography>
                        <p style={{
                            fontSize: '1rem',
                            color: '#ffffff',
                            marginTop: '4px',
                            fontStyle: 'italic',
                            opacity: 0.8
                        }}>
                            {photos?.length || 0} {photos?.length === 1 ? 'Memory' : 'Memories'}
                        </p>
                    </div>

                    <div style={{ width: '320px' }}>
                        <Select<AlbumOption, true>
                            isMulti
                            closeMenuOnSelect={false}
                            options={albumOptions}
                            onChange={filterByAlbum}
                            placeholder="Filter by albums..."
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderRadius: '12px',
                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    boxShadow: 'none',
                                    '&:hover': {
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                    },
                                    minHeight: '50px'
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: '#1a1a1a',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? '#ffffff' : state.isFocused ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                    color: state.isSelected ? '#000000' : '#ffffff',
                                    '&:active': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                    }
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }),
                                multiValueLabel: (base) => ({
                                    ...base,
                                    color: '#ffffff',
                                    fontWeight: 500
                                }),
                                multiValueRemove: (base) => ({
                                    ...base,
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                                        color: '#ffffff'
                                    }
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: '#ffffff'
                                }),
                                input: (base) => ({
                                    ...base,
                                    color: '#ffffff'
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: 'rgba(255, 255, 255, 0.5)'
                                })
                            }}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                        />
                    </div>
                </div>

                <PageAndLimitPhoto
                    limit={limit}
                    setLimit={setLimit}
                    setPage={setPage}
                    pageSize={totalPages}
                />

                <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '20px',
                    padding: '30px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    {!loading && <PhotosList photos={photos || []} />}
                </div>

                <div className="text-center mt-4 mb-5">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        marginTop: '30px'
                    }}>
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: '#ffffff',
                                opacity: 0.3 + (i * 0.1),
                                transition: '0.3s',
                            }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Photos;