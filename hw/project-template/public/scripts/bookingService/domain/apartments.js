export class Apartments {
    constructor(provider, originalId, name, description, price, image, remoteness, bookedDates) {
        this.provider = provider;
        this.originalId = originalId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.remoteness = remoteness;
        this.bookedDates = bookedDates;
    }
    get id() {
        return `${this.provider}-${this.originalId}`;
    }
    isProvidedBy(providerName) {
        return this.provider === providerName;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBhcnRtZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9ib29raW5nU2VydmljZS9kb21haW4vYXBhcnRtZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLE9BQU8sVUFBVTtJQUNyQixZQUNTLFFBQWdCLEVBQ2hCLFVBQWtCLEVBQ2xCLElBQVksRUFDWixXQUFtQixFQUNuQixLQUFhLEVBQ2IsS0FBeUIsRUFDekIsVUFBbUIsRUFDbkIsV0FBZ0I7UUFQaEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2xCLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDekIsZUFBVSxHQUFWLFVBQVUsQ0FBUztRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBSztJQUV2QixDQUFDO0lBRUgsSUFBSSxFQUFFO1FBQ0osT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQzlDLENBQUM7SUFDTSxZQUFZLENBQUMsWUFBb0I7UUFDdEMsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLFlBQVksQ0FBQTtJQUN2QyxDQUFDO0NBRUYiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQXBhcnRtZW50cyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBwcm92aWRlcjogc3RyaW5nLFxuICAgIHB1YmxpYyBvcmlnaW5hbElkOiBudW1iZXIsXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyxcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyxcbiAgICBwdWJsaWMgcHJpY2U6IG51bWJlcixcbiAgICBwdWJsaWMgaW1hZ2U/OiBzdHJpbmcgfCBzdHJpbmdbXSxcbiAgICBwdWJsaWMgcmVtb3RlbmVzcz86IG51bWJlcixcbiAgICBwdWJsaWMgYm9va2VkRGF0ZXM/OiBbXVxuXG4gICl7fVxuXG4gIGdldCBpZCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5wcm92aWRlcn0tJHt0aGlzLm9yaWdpbmFsSWR9YFxuICB9XG4gIHB1YmxpYyBpc1Byb3ZpZGVkQnkocHJvdmlkZXJOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wcm92aWRlciA9PT0gcHJvdmlkZXJOYW1lXG4gIH1cblxufVxuIl19