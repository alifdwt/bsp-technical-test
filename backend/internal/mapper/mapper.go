package mapper

type Mapper struct {
	UserMapper UserMapping
}

func NewMapper() *Mapper {
	return &Mapper{
		UserMapper: NewUserMapper(),
	}
}
