public interface IAuthService
{
    public Task<IReturn<string>> Register
                                    (Usuario model, string role);
    public Task<IReturn<string>> Login(Usuario model);

    public interface IReturn<T>
    {
        public EReturnStatus Status { get; }
        public T Result { get; } 
    }
}
