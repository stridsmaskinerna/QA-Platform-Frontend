interface UserSearchProps {
    searchTerm: string;
    handleSearchChange: (term: string) => void;
}

export function UserSearch({ searchTerm, handleSearchChange }: UserSearchProps) {
    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}  // Update search term
                placeholder="Search users"
            />
        </div>
    );
}


